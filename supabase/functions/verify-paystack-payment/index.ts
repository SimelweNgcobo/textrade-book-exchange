
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { reference } = await req.json()
    
    if (!reference) {
      return new Response(
        JSON.stringify({ error: 'Payment reference is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Verifying payment:', reference)

    // Verify payment with Paystack
    const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        'Authorization': `Bearer ${Deno.env.get('PAYSTACK_SECRET_KEY')}`,
      }
    })

    const paystackData = await paystackResponse.json()
    
    if (!paystackData.status || paystackData.data.status !== 'success') {
      return new Response(
        JSON.stringify({ error: 'Payment verification failed', verified: false }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { metadata } = paystackData.data
    const bookId = metadata.book_id
    const buyerId = metadata.buyer_id
    const sellerId = metadata.seller_id
    const bookTitle = metadata.book_title
    const amount = paystackData.data.amount / 100 // Convert from kobo to rands

    // Mark book as sold
    const { error: updateError } = await supabaseClient
      .from('books')
      .update({ sold: true })
      .eq('id', bookId)

    if (updateError) {
      console.error('Error updating book status:', updateError)
      return new Response(
        JSON.stringify({ error: 'Failed to update book status' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Record transaction
    const commission = amount * 0.10
    const { error: transactionError } = await supabaseClient
      .from('transactions')
      .insert({
        book_id: bookId,
        book_title: bookTitle,
        seller_id: sellerId,
        buyer_id: buyerId,
        price: amount,
        commission: commission
      })

    if (transactionError) {
      console.error('Error recording transaction:', transactionError)
    }

    console.log('Payment verified and transaction recorded:', reference)

    return new Response(
      JSON.stringify({
        verified: true,
        transaction: paystackData.data
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Payment verification error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

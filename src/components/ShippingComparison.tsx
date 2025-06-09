import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingDown, Zap, Star, Package } from "lucide-react";
import { toast } from "sonner";
import {
  getAllQuickQuotes,
  compareProviders,
  formatCurrency,
  getProviderById,
  QuickQuoteRequest,
  QuickQuoteResponse,
} from "@/utils/shippingUtils";

interface ShippingComparisonProps {
  request: QuickQuoteRequest;
  onProviderSelect?: (provider: "courierGuy" | "shipLogic") => void;
  autoLoad?: boolean;
  showDetails?: boolean;
}

const ShippingComparison = ({
  request,
  onProviderSelect,
  autoLoad = false,
  showDetails = true,
}: ShippingComparisonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState<QuickQuoteResponse[]>([]);
  const [comparison, setComparison] = useState<{
    cheapest: QuickQuoteResponse | null;
    fastest: QuickQuoteResponse | null;
    recommended: QuickQuoteResponse | null;
  }>({ cheapest: null, fastest: null, recommended: null });

  const handleGetQuotes = useCallback(async () => {
    setIsLoading(true);
    setQuotes([]);

    try {
      const fetchedQuotes = await getAllQuickQuotes(request);
      setQuotes(fetchedQuotes);

      if (fetchedQuotes.length === 0) {
        toast.warning("No quotes available at the moment");
      } else {
        const comparisonResult = compareProviders(fetchedQuotes);
        setComparison(comparisonResult);
        toast.success(
          `Found ${fetchedQuotes.length} shipping option${fetchedQuotes.length > 1 ? "s" : ""}`,
        );
      }
    } catch (error) {
      console.error("Error getting quotes:", error);
      toast.error("Failed to get shipping quotes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [request]);

  const getRecommendationIcon = (quote: QuickQuoteResponse) => {
    if (comparison.recommended?.provider === quote.provider) {
      return <Star className="h-4 w-4 text-yellow-500" />;
    }
    if (comparison.cheapest?.provider === quote.provider) {
      return <TrendingDown className="h-4 w-4 text-green-500" />;
    }
    if (comparison.fastest?.provider === quote.provider) {
      return <Zap className="h-4 w-4 text-blue-500" />;
    }
    return null;
  };

  const getRecommendationText = (quote: QuickQuoteResponse) => {
    if (comparison.recommended?.provider === quote.provider) {
      return "Recommended";
    }
    if (comparison.cheapest?.provider === quote.provider) {
      return "Cheapest";
    }
    if (comparison.fastest?.provider === quote.provider) {
      return "Fastest";
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Shipping Options Comparison
            </span>
            {!autoLoad && (
              <Button onClick={handleGetQuotes} disabled={isLoading} size="sm">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Get Quotes"
                )}
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        {showDetails && (
          <CardContent>
            <div className="text-sm text-gray-600">
              <p>
                <strong>From:</strong> {request.fromCity}
              </p>
              <p>
                <strong>To:</strong> {request.toCity}
              </p>
              <p>
                <strong>Weight:</strong> {request.weight}kg
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="text-center py-8">
            <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin" />
            <p className="text-gray-500">
              Getting quotes from shipping providers...
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quotes Display */}
      {quotes.length > 0 && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quotes.map((quote, index) => {
            const provider = getProviderById(quote.provider);
            const recommendationText = getRecommendationText(quote);
            const recommendationIcon = getRecommendationIcon(quote);

            return (
              <Card
                key={index}
                className={`transition-all hover:shadow-md ${
                  comparison.recommended?.provider === quote.provider
                    ? "ring-2 ring-yellow-500 ring-opacity-50"
                    : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Provider Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{provider?.logo}</span>
                        <h4 className="font-semibold">{provider?.name}</h4>
                      </div>
                      {recommendationText && (
                        <div className="flex items-center space-x-1">
                          {recommendationIcon}
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              recommendationText === "Recommended"
                                ? "border-yellow-500 text-yellow-700"
                                : recommendationText === "Cheapest"
                                  ? "border-green-500 text-green-700"
                                  : "border-blue-500 text-blue-700"
                            }`}
                          >
                            {recommendationText}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Price and Service */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(quote.price)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {quote.serviceName}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-700">
                          {quote.estimatedDays} day
                          {quote.estimatedDays !== 1 ? "s" : ""}
                        </div>
                        <div className="text-xs text-gray-500">
                          Estimated delivery
                        </div>
                      </div>
                    </div>

                    {/* Provider Features */}
                    {showDetails && provider && (
                      <div className="text-xs text-gray-600">
                        <div className="flex flex-wrap gap-1">
                          {provider.features
                            .slice(0, 2)
                            .map((feature, featureIndex) => (
                              <Badge
                                key={featureIndex}
                                variant="secondary"
                                className="text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Select Button */}
                    {onProviderSelect && (
                      <Button
                        onClick={() => onProviderSelect(quote.provider)}
                        variant={
                          comparison.recommended?.provider === quote.provider
                            ? "default"
                            : "outline"
                        }
                        className="w-full"
                        size="sm"
                      >
                        Select {provider?.name}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* No Results */}
      {quotes.length === 0 && !isLoading && !autoLoad && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-gray-500">
              Click "Get Quotes" to compare shipping options
            </p>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      {quotes.length > 1 && !isLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {comparison.cheapest && (
                <div className="text-center p-3 bg-green-50 rounded">
                  <TrendingDown className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <div className="font-semibold">Cheapest Option</div>
                  <div className="text-green-700">
                    {getProviderById(comparison.cheapest.provider)?.name}
                  </div>
                  <div className="text-green-600 font-bold">
                    {formatCurrency(comparison.cheapest.price)}
                  </div>
                </div>
              )}

              {comparison.fastest && (
                <div className="text-center p-3 bg-blue-50 rounded">
                  <Zap className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <div className="font-semibold">Fastest Option</div>
                  <div className="text-blue-700">
                    {getProviderById(comparison.fastest.provider)?.name}
                  </div>
                  <div className="text-blue-600 font-bold">
                    {comparison.fastest.estimatedDays} day
                    {comparison.fastest.estimatedDays !== 1 ? "s" : ""}
                  </div>
                </div>
              )}

              {comparison.recommended && (
                <div className="text-center p-3 bg-yellow-50 rounded">
                  <Star className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
                  <div className="font-semibold">Recommended</div>
                  <div className="text-yellow-700">
                    {getProviderById(comparison.recommended.provider)?.name}
                  </div>
                  <div className="text-yellow-600 font-bold">Best Value</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShippingComparison;

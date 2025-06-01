
interface BookDescriptionProps {
  description?: string;
}

const BookDescription = ({ description }: BookDescriptionProps) => {
  if (!description) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Description</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
};

export default BookDescription;

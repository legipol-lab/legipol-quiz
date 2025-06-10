// src/components/Card.tsx
import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  href: string;
}

export default function Card({ title, description, href }: CardProps) {
  return (
    <Link
      href={href}
      className="block bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}
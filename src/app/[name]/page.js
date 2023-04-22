'use client'
import { useSearchParams } from 'next/navigation';
export const dynamicParams = true 
export const dynamic = 'force-dynamic'
export default function Other() {
  const searchParams = useSearchParams();
  return (
    <div>Hello other</div>
  )
}

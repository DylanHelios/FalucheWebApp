import { Card, CardContent } from "@/components/ui/card"

interface InsigneCardProps {
  children: React.ReactNode
}

export function InsigneCard({ children }: InsigneCardProps) {
  return (
    <Card className="mb-4 ml-6 mr-6">
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
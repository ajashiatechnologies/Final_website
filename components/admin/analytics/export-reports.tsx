"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, BarChart3, Users } from "lucide-react"

const reports = [
  {
    title: "Sales Report",
    description: "Detailed sales data and analytics",
    icon: BarChart3,
    format: "CSV/PDF",
  },
  {
    title: "Customer Report",
    description: "Customer demographics and behavior",
    icon: Users,
    format: "CSV/Excel",
  },
  {
    title: "Product Report",
    description: "Product performance and inventory",
    icon: FileText,
    format: "PDF/Excel",
  },
]

export function ExportReports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.title} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <report.icon className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-medium">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <p className="text-xs text-muted-foreground">Available in: {report.format}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

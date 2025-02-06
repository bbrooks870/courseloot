"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PDFViewerModalProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
  title: string
}

export function PDFViewerModal({ isOpen, onClose, pdfUrl, title }: PDFViewerModalProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setIsLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>View the PDF document: {title}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">
          {isLoading && (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-12 h-12 animate-spin text-gray-500" />
            </div>
          )}
          <Document
            file={{ url: pdfUrl }}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<Loader2 className="w-12 h-12 animate-spin text-gray-500" />}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <div className="flex items-center justify-between w-full mt-4">
            <Button onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))} disabled={pageNumber <= 1}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <p>
              Page {pageNumber} of {numPages}
            </p>
            <Button
              onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages || 1))}
              disabled={pageNumber >= (numPages || 1)}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


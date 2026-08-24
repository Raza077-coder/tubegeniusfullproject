import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// Export as CSV
export function exportToCSV(data: any[], filename: string) {
  if (!data || data.length === 0) {
    console.error('No data to export')
    return
  }

  // Get headers
  const headers = Object.keys(data[0])
  
  // Create CSV rows
  const csvRows = []
  
  // Add headers
  csvRows.push(headers.join(','))
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header] || ''
      // Handle commas in values
      return `"${String(value).replace(/"/g, '""')}"`
    })
    csvRows.push(values.join(','))
  }
  
  // Create download
  const csvString = csvRows.join('\n')
  const blob = new Blob([csvString], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

// Export as PDF
export function exportToPDF(data: any[], title: string, filename: string) {
  if (!data || data.length === 0) {
    console.error('No data to export')
    return
  }

  // Create PDF document
  const doc = new jsPDF()
  
  // Add title
  doc.setFontSize(18)
  doc.text(title, 14, 20)
  
  // Add date
  doc.setFontSize(10)
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30)
  
  // Prepare table data
  const headers = Object.keys(data[0])
  const tableData = data.map(row => headers.map(header => row[header] || ''))
  
  // Add table
  autoTable(doc, {
    head: [headers],
    body: tableData,
    startY: 40,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [99, 102, 241], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
  })
  
  // Save PDF
  doc.save(`${filename}.pdf`)
}

// Export dashboard stats as PDF
export function exportDashboardStats(stats: any, videos: any[]) {
  const doc = new jsPDF()
  let yPos = 20
  
  // Title
  doc.setFontSize(20)
  doc.text('TubeGenius Dashboard Report', 14, yPos)
  yPos += 10
  
  // Date
  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, yPos)
  yPos += 15
  
  // Stats Section
  doc.setFontSize(14)
  doc.text('Channel Statistics', 14, yPos)
  yPos += 10
  
  const statsData = [
    ['Total Videos', stats.videos?.toString() || '0'],
    ['Channels', stats.channels?.toString() || '0'],
    ['Subscribers', stats.subscribers?.toLocaleString() || '0'],
    ['Total Views', stats.views?.toLocaleString() || '0'],
    ['Watch Time', `${stats.watchTime?.toLocaleString() || '0'} hours`],
    ['Engagement Rate', `${stats.engagement || 0}%`],
  ]
  
  autoTable(doc, {
    body: statsData,
    startY: yPos,
    styles: { fontSize: 10, cellPadding: 4 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 }, 1: { cellWidth: 80 } },
  })
  
  yPos = (doc as any).lastAutoTable.finalY + 15
  
  // Videos Section
  if (videos && videos.length > 0) {
    doc.setFontSize(14)
    doc.text('Top Videos', 14, yPos)
    yPos += 10
    
    const videoData = videos.slice(0, 10).map(v => [
      v.title || 'Untitled',
      v.views?.toLocaleString() || '0',
      v.likes?.toLocaleString() || '0'
    ])
    
    autoTable(doc, {
      head: [['Video Title', 'Views', 'Likes']],
      body: videoData,
      startY: yPos,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [99, 102, 241] },
    })
  }
  
  // Save
  doc.save('tubegenius-dashboard-report.pdf')
}
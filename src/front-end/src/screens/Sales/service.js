import * as Print from "expo-print"
import * as Sharing from "expo-sharing"
import { File, Directory, Paths } from "expo-file-system"
import { formatToBRL, formatDate } from "@utils/formatter"

function safeDate(date) {
  return formatDate(date).replace(/\//g, "-")
}

function firestoreDateToJs(date) {
  return new Date(date.seconds * 1000)
}

export async function generateSalesPDF(sales, startDate, finalDate) {
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0)

  const allItems = sales.flatMap(sale => sale.items)

  const totalItems = allItems.reduce((sum, item) => sum + item.quantity, 0)

  const averageTicket = sales.length > 0 ? totalSales / sales.length : 0

  const highestSale = sales.reduce(
    (max, sale) => (sale.amount > max.amount ? sale : max),
    sales[0]
  )

  const mostSoldProduct = (() => {
    const productMap = {}
    for (const item of allItems) {
      if (!productMap[item.name]) productMap[item.name] = 0
      productMap[item.name] += item.quantity
    }
    const sorted = Object.entries(productMap).sort((a, b) => b[1] - a[1])
    return { name: sorted[0][0], quantity: sorted[0][1] }
  })()

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .container { margin: 0 auto; max-width: 800px; }
          h1, h2, h3 { color: #333; }
          .summary {
            margin-top: 20px;
            padding: 15px;
            background: #f9f9f9;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .summary p {
            margin: 6px 0;
            font-size: 15px;
            font-weight: bold;
          }
          .sale-block {
            margin-top: 25px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background: #fcfcfc;
          }
          .sale-block p {
            margin: 4px 0;
            font-size: 14px;
          }
          .item-block {
            margin-top: 10px;
            padding: 10px;
            border: 1px dashed #ccc;
            border-radius: 5px;
          }
          .item-block p {
            margin: 3px 0;
            font-size: 13px;
          }
          .header-main { text-align: center; margin-bottom: 30px; }
          @page {
            @top-center { content: "Relatório de Vendas | ${formatDate(startDate)} até ${formatDate(finalDate)}"; font-size: 10px; color: #666; }
            @bottom-right { content: "Página " counter(page); font-size: 10px; color: #666; }
            margin: 1.5cm;
          }
        </style>
      </head>

      <body>
        <div class="container">

          <div class="header-main">
            <h1>Relatório de Vendas</h1>
            <p><strong>Período:</strong> ${formatDate(startDate)} - ${formatDate(finalDate)}</p>
          </div>

          <h2>Resumo</h2>
          <div class="summary">
            <p>Total Vendido: ${formatToBRL(totalSales)}</p>
            <p>Total de Itens Vendidos: ${totalItems}</p>
            <p>Ticket Médio: ${formatToBRL(averageTicket)}</p>
            <br />
            <p>Produto Mais Vendido: ${mostSoldProduct.name} (${mostSoldProduct.quantity} unidades)</p>
            <p>Maior Venda: ${formatToBRL(highestSale.amount)}</p>
          </div>

          <h2 style="margin-top: 40px;">Vendas</h2>

          ${sales
            .map(
              (sale) => `
                <div class="sale-block">
                  <p><strong>ID da Venda:</strong> ${sale.id}</p>
                  <p><strong>Cliente:</strong> ${sale.clientName}</p>
                  <p><strong>Data:</strong> ${formatDate(firestoreDateToJs(sale.date))}</p>
                  <p><strong>Valor Total:</strong> ${formatToBRL(sale.amount)}</p>

                  ${sale.items
                    .map(
                      (item) => `
                        <div class="item-block">
                          <p><strong>Produto:</strong> ${item.name}</p>
                          <p><strong>Descrição:</strong> ${item.description}</p>
                          <p><strong>Categoria:</strong> ${item.category}</p>
                          <p><strong>Quantidade:</strong> ${item.quantity}</p>
                          <p><strong>Preço Unitário:</strong> ${formatToBRL(item.amount)}</p>
                          <p><strong>Subtotal:</strong> ${formatToBRL(item.amount * item.quantity)}</p>
                        </div>
                      `
                    )
                    .join("")}
                </div>
              `
            )
            .join("")}

        </div>
      </body>
    </html>
  `

  try {
    const { uri: tempUri } = await Print.printToFileAsync({ html })

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const fileName = `sales-report-${safeDate(startDate)}-${safeDate(finalDate)}-${timestamp}.pdf`

    const reportsDirectory = new Directory(Paths.document, "reports")
    const destinationFile = new File(reportsDirectory, fileName)

    const directoryExists = await reportsDirectory.exists
    if (!directoryExists) await reportsDirectory.create()

    const sourceFile = new File(tempUri)
    await sourceFile.move(destinationFile)

    const finalUri = destinationFile.uri
    await Sharing.shareAsync(finalUri)

  } catch (error) {
    console.error("Error generating or sharing PDF:", error)
  }
}

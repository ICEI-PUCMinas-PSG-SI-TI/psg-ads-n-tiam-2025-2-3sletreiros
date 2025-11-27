import * as Print from "expo-print"
import * as Sharing from "expo-sharing"
import { File, Directory, Paths } from "expo-file-system"
import { formatToBRL, formatDate } from "../../utils/formatter";

function safeDate(date) {
  return formatDate(date).replace(/\//g, "-")
}

export async function generatePDF(transactions, startDate, finalDate) {
  
  const totalReceitas = transactions.filter(t => t.type === 'invoice').reduce((sum, t) => sum + parseFloat(t.amount), 0)
  const totalDespesas = transactions.filter(t => t.type !== 'invoice').reduce((sum, t) => sum + parseFloat(t.amount), 0)
  const saldoFinal = totalReceitas - totalDespesas

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .container { margin: 0 auto; max-width: 800px; }
          h1, h2, h3 { color: #333; }

          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 14px; }
          th { background-color: #f2f2f2; color: #333; font-weight: bold; }
          tr:nth-child(even) { background-color: #f9f9f9; }

          .totais-resumo { margin-top: 30px; border: 1px solid #ccc; padding: 15px; border-radius: 5px; background-color: #f9f9f9; }
          .totais-resumo p { margin: 5px 0; font-weight: bold; }
          .receita { color: #28a745; }
          .despesa { color: #dc3545; }
          .saldo { color: #007bff; font-size: 1.2em; border-top: 1px solid #ccc; padding-top: 10px; margin-top: 10px; }

          .header-main { text-align: center; margin-bottom: 30px; }
          .logo-placeholder { font-size: 18px; font-weight: bold; color: #007bff; border: 2px solid #007bff; padding: 5px 10px; display: inline-block; }

          @page {
              @top-center { content: "Relatório Financeiro | ${formatDate(startDate)} a ${formatDate(finalDate)}"; font-size: 10px; color: #666; }
              @bottom-right { content: "Página " counter(page); font-size: 10px; color: #666; }
              margin: 1.5cm;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header-main">
            <h1>Relatório de Transações</h1>
            <p><strong>Período:</strong> ${formatDate(startDate)} - ${formatDate(finalDate)}</p>
          </div>

          <h2>Detalhes das Transações</h2>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Título/Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              ${transactions.map(t => `
                <tr>
                  <td>${formatDate(t.date)}</td>
                  <td>${t.name}</td>
                  <td>${t.category}</td>
                  <td style="color: ${t.type === 'invoice' ? '#28a745' : '#dc3545'};">
                    ${formatToBRL(t.amount)}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <div class="totais-resumo">
            <h3>Resumo Financeiro</h3>
            <p class="receita">Total de Receitas: ${formatToBRL(totalReceitas)}</p>
            <p class="despesa">Total de Despesas: ${formatToBRL(totalDespesas)}</p>
            <p class="saldo">Saldo Final: ${formatToBRL(saldoFinal)}</p>
          </div>

        </div>
      </body>
    </html>
  `

  try {
    const { uri: tempUri } = await Print.printToFileAsync({ html })

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); 
    const uniqueFileName = `Relatorio-transacoes-${safeDate(startDate)}-${safeDate(finalDate)}-${timestamp}.pdf`
    
    const reportsDir = new Directory(Paths.document, "reports")
    
    const destFile = new File(reportsDir, uniqueFileName)

    const dirExists = await reportsDir.exists
    if (!dirExists) {
        await reportsDir.create()
        console.log("Diretório 'reports' criado.")
    }

    const srcFile = new File(tempUri)
    
    await srcFile.move(destFile)
    
    const finalUri = destFile.uri 
    
    console.log('Final URI para compartilhamento:', finalUri)

    await Sharing.shareAsync(finalUri)

  } catch (error) {
    console.error("Erro ao gerar ou compartilhar PDF:", error)
  }
}
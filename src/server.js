const express = require("express");
const ejs = require("ejs");
const path = require("path");
const puppeteer = require('puppeteer');
const app = express();

const passengers = [
  {
    name: "Joyce",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Brock",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Eve",
    flightNumber: 7859,
    time: "18h00",
  },
];
// ASYNC - retorna uma promise (promessa). O código só continua quando retornar um valor, a promese é resolvida com o valor retornado
// Await - função assíncrona pode ter await. O await pausa a execusão da função e espera a resposta da promise
// endpoint para pegar os dados do documento print-ejs
// request = pedido
// response = reposta
app.get('/pdf', async (request, response) => {

    // variável que inicia o browser - por padrão o { headless: false }
    const browser = await puppeteer.launch()
    // variável que abre uma nova página no browser
    const page = await browser.newPage()

    // local onde o pdf será aberto
    await page.goto('http://localhost:3000/', {
      // esperar carregar toda a página
      waitUntil: 'networkidle0'
    })

    // seta a formatação do pdf que será gerado
    const pdf = await page.pdf({
      printBackground: true,
      format: 'Letter',
      padding: {
        top: "20px",
        bottom: "40px",
        left: "20px",
        right: "20px"
      }
    })

    // fecha o browser
    await browser.close()

    
    response.contentType("application/pdf")
    
    return response.send(pdf)
})

// request = pedido
// response = reposta
app.get("/", (request, response) => {
  const filePath = path.join(__dirname, "print.ejs");
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if (err) {
      return response.send("Erro na leitura do arquivo");
    }

    // enviar para o navegador
    return response.send(html);
  });
});

app.listen(3000);

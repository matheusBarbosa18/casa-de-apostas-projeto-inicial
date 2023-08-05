const express = require('express');
const app = express();
const port = 3000;

let contadorGanhos = 0;
let contadorPerdas = 0;
app.get('/aposta', (req, res) => {
    const valorApostado = parseFloat(req.query.valor);
    const tipoAposta = req.query.tipo;

    if (!valorApostado || !tipoAposta) {
        return res.status(400).json({ error: 'É necessário informar o valor e o tipo da aposta.' });
    }

     if (tipoAposta === 'paridade') {
        const numeroSorteado = Math.floor(Math.random() * 10) + 1;
        const ganho = valorApostado * 2; // Exemplo: ganho 2x o valor apostado se acertar a paridade
        const resultado = numeroSorteado % 2 === 0 ? 'Ganhou!' : 'Perdeu!';

        // Atualiza o contador de ganhos ou perdas
        if (resultado === 'Ganhou!') {
            contadorGanhos++;
        } else {
            contadorPerdas++;
        }

        return res.json({ numeroSorteado, ganho, resultado });
    } else {
        return res.status(400).json({ error: 'Tipo de aposta inválido. Tipos válidos: "numero" ou "paridade".' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`API de apostas rodando na porta ${port}`);
});

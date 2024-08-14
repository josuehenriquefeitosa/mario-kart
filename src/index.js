const player1 = {
    nome: 'Mario',
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
}

const player2 = {
    nome: 'Luigi',
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0
}


async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = 'reta'
            break;
        case random < 0.66:
            result = 'curva'
            break;
        default:
            result = 'confronto'
    }

    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(` ${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {
    for (let i = 1; i <= 5; i++) {
        console.log(`🏁 Rodada ${i}`);


        // sortear bloco
        let block = await getRandomBlock()
        console.log(` Bloco: ${block}`)


        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;
        if (block === 'reta') {
            totalTestSkill1 = diceResult1 + character1.velocidade
            totalTestSkill2 = diceResult2 + character2.velocidade

            await logRollResult(
                character1.nome,
                'velocidade',
                diceResult1,
                character1.velocidade);

            await logRollResult(
                character2.nome,
                'velocidade',
                diceResult2,
                character2.velocidade);
        }
        if (block === 'curva') {
            totalTestSkill1 = diceResult1 + character1.manobrabilidade
            totalTestSkill2 = diceResult2 + character2.manobrabilidade

            await logRollResult(
                character1.nome,
                'manobrabilidade',
                diceResult1,
                character1.manobrabilidade);

            await logRollResult(
                character2.nome,
                'manobrabilidade',
                diceResult2,
                character2.manobrabilidade);
        }
        if (block === 'confronto') {
            let powerResult1 = diceResult1 + character1.poder
            let powerResult2 = diceResult2 + character2.poder

            console.log(`${character1.nome} confrontou com ${character2.nome} 🥊`)

            await logRollResult(
                character1.nome,
                'poder',
                diceResult1,
                character1.poder);

            await logRollResult(
                character2.nome,
                'poder',
                diceResult2,
                character2.poder);

            if(powerResult1 > powerResult2 && character2.pontos > 0){
                console.log(`${character1.nome} venceu o confronto ${character2.nome} perdeu 1 ponto 🐢`)
                character2.pontos--;
            }

            if(powerResult2 > powerResult1 && character1.pontos > 0){
                console.log(`${character2.nome} venceu o confronto ${character1.nome} perdeu 1 ponto 🐢`)
                character1.pontos--;
            }
           

            console.log(
                powerResult1 === powerResult2 ? 'Confronto empatado!Nenhum ponto foi perdido.' : ''
            )

        }

        //verificando o vencedor
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.nome} marcou um ponto!`)
            character1.pontos++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.nome} marcou um ponto!`)
            character2.pontos++;
        }

        console.log('----------------------------')

    }


}

async function declareWinner(character1,character2){
    console.log(`Resultado final: 
        ${character1.nome}: ${character1.pontos} ponto(s)
        ${character2.nome}: ${character2.pontos} ponto(s)`
    )
    if(character1.pontos > character2.pontos){
        console.log(`\n${character1.nome} venceu a corrida! Parabéns!🏆`)
    }else if(character2.pontos > character1.pontos){
        console.log(`\n${character2.nome} venceu a corrida! Parabéns!🏆`)
    } else{
        console.log(`\nA corrida terminou em empate.`)
    }
    
}


(async function main() {
    console.log(
        `🏁🚨 Corrida entre o ${player1.nome} e o ${player2.nome} começando....\n `)

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})()
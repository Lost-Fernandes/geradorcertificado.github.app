document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const evento = document.getElementById('evento').value;

    // Texto do certificado
    const certificadoTexto = `Conferido A ${nome}, por sua participação "${evento}", realizado no dia ${new Date().toLocaleDateString('pt-BR')}, 
com uma carga horária de 30 horas, contribuindo para o desenvolvimento de habilidades e conhecimentos relevantes.`;

    document.getElementById('texto-certificado').innerText = certificadoTexto;
    document.getElementById('certificado').style.display = 'block';

    document.getElementById('baixar').addEventListener('click', function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('landscape'); // Formato horizontal

        // Fundo e borda
        doc.setFillColor(240, 240, 240); // Cor de fundo cinza claro
        doc.rect(10, 10, 277, 190, 'F'); // Retângulo para o fundo
        doc.setLineWidth(2);
        doc.setDrawColor(212, 175, 55); // Cor metálica dourada
        doc.rect(10, 10, 277, 190); // Retângulo da borda

        // Título do certificado
        doc.setFont('Georgia', 'bold');
        doc.setFontSize(28);
        doc.setTextColor(0, 0, 0); // Preto para texto
        doc.text("Certificado de Participação", 148.5, 50, null, null, 'center'); // Centralizado

        // Nome do participante
        doc.setFont('Georgia', 'normal');
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 0); // Preto
        doc.text(`Conferido A`, 148.5, 80, null, null, 'center'); // Centralizado
        doc.setFont('Georgia', 'bold');
        doc.text(nome, 148.5, 90, null, null, 'center'); // Nome destacado

        // Detalhes do evento
        doc.setFont('Georgia', 'normal');
        doc.text(
            `por sua participação "${evento}", realizado no dia ${new Date().toLocaleDateString('pt-BR')}, com uma carga horária de 30 horas.`,
            148.5,
            110,
            { align: 'center', maxWidth: 250 } // Centralizado com quebra de linha automática
        );

        // Data de emissão
        doc.setFontSize(12);
        doc.text(`Emitido em: ${new Date().toLocaleDateString('pt-BR')}`, 148.5, 140, null, null, 'center');

        // Espaço para assinatura
        // Assinatura do Responsável (Centro)
doc.text("______________________________", 148.5, 160, null, null, 'center');
doc.text("Diretor", 148.9, 172, null, null, 'center');

// Secretário (Esquerda)
doc.text("______________________________", 50, 160, null, null, 'center'); // Alinhado à esquerda
doc.text("Secretário", 50, 170, null, null, 'center');

// Participante (Direita)
doc.text("______________________________", 247, 160, null, null, 'center'); // Alinhado à direita
doc.text("Participante", 247, 170, null, null, 'center');


        // Rodapé
        doc.setFontSize(10);
        doc.text("Este certificado é válido como comprovação de participação.", 148.5, 180, null, null, 'center');
        doc.text("Instituição: Instituto Arttex Comunicações | www.ArttexComunicaçoes.com", 148.5, 190, null, null, 'center');

        // Salvar o PDF
        doc.save(`${nome}_certificado.pdf`);
    });
});

const axios = require('axios');
const pdf = require('pdfkit');
const rp = require('request-promise');

const generarPDF = async(pokemonName)=>{
    return new Promise(async(resolve, reject)=>{
        // Consultar la PokeAPI para obtener información del Pokémon
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

    // Crear un nuevo documento PDF
    const doc = new pdf();

     // Establecer la fuente por defecto como Arial
  doc.font('Helvetica-Bold');

  // Agregar margen azul alrededor del contenido
  const margin = 50;

  // Establecer el tamaño y estilo del título
  doc.fontSize(20).text('Información del Pokémon', margin + 50, margin + 50, { bold: true });

  // Establecer el estilo de los demás textos
  doc.fontSize(14).lineGap(10);
    doc.text(`Nombre: ${data.name}`, margin + 50, margin + 200, { continued: false, underline: false }).font('Helvetica');
    doc.text(`ID: ${data.id}`, margin + 50, margin + 230, { continued: false, underline: false }).font('Helvetica');
    doc.text(`Peso: ${data.weight} g`, margin + 50, margin + 260, { continued: false, underline: false }).font('Helvetica');
    doc.text(`Altura: ${data.height} cm`, margin + 50, margin + 290, { continued: false, underline: false }).font('Helvetica');

    doc.text('\nHabilidades:');

    const abilities = data.abilities.map((ability) => ability.ability.name);
    doc.list(abilities);

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    const imageBuffer = await rp({ url: imageUrl, encoding: null });

  // Agregar la imagen al documento PDF
   doc.image(imageBuffer, margin + 50, margin + 100, { width: 100, height: 100 });

    resolve(doc);
    })
}

module.exports=generarPDF;
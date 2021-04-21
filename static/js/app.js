

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.




//Use otu_ids as the labels for the bar chart.

//Use otu_labels as the hovertext for the chart.
// function to create chart
function plotChart(id) {
    ////Use the D3 library to read in samples.json
    d3.json("samples.json").then((data) => {
        console.log(data)

        // Filter sample values by selected id
        var filteredSample = data.samples.filter(sample => sample.id === id)[0];
        console.log(filteredSample);
        // Get the top 10 OTUs
        var values = filteredSample.sample_values.slice(0, 10).reverse();
        var otuids = filteredSample.otu_ids.map(otuid => `OTU ${otuid}`).slice(0, 10).reverse();
        var otulabels = filteredSample.otu_labels.slice(0, 10).reverse();

        var trace1 = {
            x: values,
            y: otuids,
            hovertext: otulabels,
            type: "bar",
            orientation: "h",
        };
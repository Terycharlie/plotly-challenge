

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.


// Filter sample values by selected id





// var jsonSamples ="samples.json"
//    
//     d3.json("./samples.json").then(function(data) {
//         console.log(data);
//     });
 
// Create plots: bar chart and bubble chart
function createChart(id) {
     //Use the D3 library to read in samples.json
    d3.json("samples.json").then((data) => {
        console.log(data)

        // Filter sample values by selected id
        var samplevalues = data.samples.filter(sample => sample.id === id)[0];
        console.log(samplevalues);
        // Get the top 10 OTUs
        var values = samplevalues.sample_values.slice(0, 10);
         //Use otu_ids as the labels for the bar chart.
        var otuids = samplevalues.otu_ids.map(otuid => `OTU ${otuid}`).slice(0, 10);
       //Use otu_labels as the hovertext for the chart.
        var otulabels = samplevalues.otu_labels.slice(0, 10);

        var trace1 = {
            x: values,
            y: otuids,
            hovertext: otulabels,
            type: "bar",
            orientation: "h",
        };

        var data1 = [trace1];
        var layout1 = {
            title: "Top 10 OTUs",
            margin: {
                l: 110,
                r: 110,
                t: 110,
                b: 45
            }
        };
        Plotly.newPlot("bar", data1, layout1);

        var trace2 = {
            x: samplevalues.otu_ids,
            y: samplevalues.sample_values,
            mode: "markers",
            marker: {
                size: samplevalues.sample_values,
                color: samplevalues.otu_ids
            },
            text: samplevalues.otu_labels
        };
        var layout2 = {
            xaxis: {
                title: "OTU ID"
            },
            height: 600,
            width: 1000
        };
        var data2 = [trace2];
        Plotly.newPlot("bubble", data2, layout2);
    })
};

// Display the metadata
function displayMetadata(id) {
    d3.json("samples.json").then((data) => {
        var filteredMetadata = data.metadata.filter(sample => sample.id === id)[0];
        console.log(filteredMetadata);
        var sampleMetadata = d3.select("#sample-metadata");
        sampleMetadata.html("");
        Object.entries(filteredMetadata).forEach(function ([key, value]) {
            var row = sampleMetadata.append("tbody");
            row.text(`${key}: ${value}`);
        })

    })
}


// Create the function for changing event
function optionChanged(id) {
    createChart(id);
    displayMetadata(parseInt(id));
    createGaugeChart(parseInt(id));
}

// Create the default page
function init() {
    var dropdown = d3.select("#selDataset");
    // Generate the sample list to populate the select options
    d3.json("samples.json").then((data) => {
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        createChart(data.names[0]);
        displayMetadata(parseInt(data.names[0]));
        createGaugeChart(parseInt(data.names[0]))
    });
}

// Initialize the dashboard
init();


//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.


// Filter sample values by selected id

//Use otu_ids as the labels for the bar chart.

//Use otu_labels as the hovertext for the chart.

var jsonSamples ="samples.json"
    //Use the D3 library to read in samples.json
    d3.json("./samples.json").then(function(data) {
        console.log(data);
    });
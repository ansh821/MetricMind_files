# MetricMind Semantic Layer.
# Central definition of governed business metrics and dimensions.

METRICS = {

    "revenue": {
        "name": "Revenue",
        "definition": 'SUM("Sales")',
        "description": "Total sales revenue generated.",
        "type": "currency",
        "aggregation": "sum",
        "source_column": "Sales"
    },

    "profit": {
        "name": "Profit",
        "definition": 'SUM("Profit")',
        "description": "Total profit generated.",
        "type": "currency",
        "aggregation": "sum",
        "source_column": "Profit"
    },

    "profit_margin": {
        "name": "Profit Margin",
        "definition": '(SUM("Profit") / NULLIF(SUM("Sales"), 0)) * 100',
        "description": "Profit as a percentage of total sales.",
        "type": "percentage",
        "aggregation": "calculated",
        "source_columns": ["Profit", "Sales"]
    },

}

DIMENSIONS = {

    "region": {
        "name": "Region",
        "column": '"Region"',
        "description": "Geographical region of the sale."
    },

    "category": {
        "name": "Category",
        "column": '"Category"',
        "description": "Main product category."
    },

    "sub_category": {
        "name": "Sub Category",
        "column": '"Sub.Category"',
        "description": "Product sub-category."
    },

    "product": {
        "name": "Product",
        "column": '"Product.Name"',
        "description": "Name of the product."
    },

    "country": {
        "name": "Country",
        "column": '"Country"',
        "description": "Country where the sale occurred."
    },

    "market": {
        "name": "Market",
        "column": '"Market"',
        "description": "Market associated with the sale."
    },

    "segment": {
        "name": "Segment",
        "column": '"Segment"',
        "description": "Customer segment."
    },

    "year": {
        "name": "Year",
        "column": '"Year"',
        "description": "Year in which the sale occurred."
    }

}
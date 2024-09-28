# Research ArcGIS Pretrained Model 

### Overview
- We want to know what it would take to use this model: [ArcGIS Plant Leaf Disease Classification model](https://doc.arcgis.com/en/pretrained-models/latest/imagery/using-plant-leaf-disease-classification.htm)

- ArcGIS makes the model available for download as well as through ArcGIS Pro. The model is implemented using the ArcGIS Python API,
so it is possible for us to host the model ourselves. See this conversation for how this might look: [Claude conversation](https://claude.site/artifacts/9f11ab64-248a-459c-b15a-f16d5c60f5a8).

### Capabilities
- The model can identify diseases for a small number of crops (apples, corn, tomatoes, strawberries, etc.) with decent accuracy,
but then this puts this downstream of plant identification.

- However, the input must 224x224 pixels. This requirement introduces an issue of cropping and scaling the relevant
part of the image and eliminating irrelevant background details, which can be difficult--how do we know which plant the user is curious about?
There are segmentation and other models that can help with this, at the cost of added complexity. 

- Inference scalability: Limited by the resources we devote to self-hosting; we can spin up another instance if needed. This is not likely to be an issue for the time being.

### Licensing
- We will need to look into this if we decide to use this model. I am not familiar with ArcGIS's licenses.

### Conclusion
- This model seems like it would be useful for identifying some diseases in the supported plants.
- We could host the model and expose an API to ineract with the model from our backend. This wouldn't lock us into using any particular framework or language.

### Recommendation
- Newer models available via API (Qwen for instance) are all-around a better choice: easier to work with (API call vs. self-hosting, no preprocessing) and generally more powerful. 
  
---
Contributors: Blair


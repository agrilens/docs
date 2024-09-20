# Research: Model Selection for Argilens #3

## Initial Questions

- What model do we want to use for this application?
- Should we focus on APIs or training a model with our own data?
- Need to collect research papers and discuss to determine the best approach.

## Research Findings

1. **Pre-trained model option:**
   - [ArcGIS Land Cover Classification model](https://www.arcgis.com/home/item.html?id=3073e0d82ec04db497c132352bd84a33)

2. **Model Deployment reference:**
   - [ESRI Blog: Identify plant species using deep learning tools in ArcGIS Pro](https://www.esri.com/arcgis-blog/products/arcgis-pro/imagery/identify-plant-species-using-deep-learning-tools-in-arcgis-pro/)

3. **Overview of approaches:**
   - [MDPI Agronomy: Machine Learning in Smart Agriculture](https://www.mdpi.com/2073-4395/12/10/2395#B17-agronomy-12-02395)
   (First few pages provide a good summary)

4. **Performance comparison of pre-trained models:**
   - [IEEE: Performance Comparison of Pre-trained Models for Plant Disease Classification](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10086516)
   (See pages 35406-35407 for comparison)

5. **Popular dataset for fine-tuning:**
   - [PlantVillage Dataset on GitHub](https://github.com/spMohanty/PlantVillage-Dataset/tree/master)

6. **Potential initial approach:**
   - Consider using an API initially to get a working prototype, even with poor performance
   - Plan to replace with a better model later

## Decision

After evaluating the research papers and considering deployment challenges, we have decided to use the following model:

- [Qwen/Qwen2-VL-72B-Instruct](https://huggingface.co/Qwen/Qwen2-VL-72B-Instruct)

**Rationale:** The models discussed in the research papers, while helpful, were deemed too complex for easy deployment. Qwen2-VL meets our user requirements and can be hosted or called via API, making it a more practical choice for our needs.

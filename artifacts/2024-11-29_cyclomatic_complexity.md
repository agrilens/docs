# Cyclomatic Complexity Results

## AgriLens Team Slack message:

> Blair Ednie  6:26 PM
> I was able to use Eslint to get the complexity:

> ```bash
> bednie@msu2 agrilens-frontend % npx eslint "src/**/*.{js,jsx}" --ignore-pattern "*.cy.jsx" --rule 'complexity: ["error", 10]'
> /Users/bednie/fall-2024/agrilens-frontend/src/homePage/uploadImage/DataTable.jsx
>  13:19  error  Arrow function has a complexity of 11. Maximum allowed is 10  complexity
>
> ✖ 1 problem (1 error, 0 warnings)
> ```
>It seems like all other files are below 12 in complexity. This at least gives us an upper bound on cyclomatic complexity. 

using System.Net;
using System.Security.Claims;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");

    return req.CreateResponse(HttpStatusCode.OK, new {
        CurrentPrincipalClaims = ClaimsPrincipal.Current.Claims,
        RequestDateTime = DateTime.Now,
        Customers = new List<object> {
            new {
                CustomerID = "ALFKI",
                CompanyName = "Alfreds Futterkiste",
                ContactName = "Maria Anders",
                Country = "Germany"
            },
            new {
                CustomerID = "ANATR",
                CompanyName = "Ana Trujillo Emparedados y helados",
                ContactName = "Ana Trujillo",
                Country = "Mexico"
            },
            new {
                CustomerID = "ANTON",
                CompanyName = "Antonio Moreno Taquería",
                ContactName = "Antonio Moreno",
                Country = "Mexico"
            },
            new {
                CustomerID = "AROUT",
                CompanyName = "Around the Horn",
                ContactName = "Thomas Hardy",
                Country = "UK"
            },
            new {
                CustomerID = "BERGS",
                CompanyName = "Berglunds snabbköp",
                ContactName = "Christina Berglund",
                Country = "Sweden"
            },
        },
    });
}

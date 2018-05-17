using SharePointPnP.LobScenario.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SharePointPnP.LobScenario.Web.Controllers
{
    public class CustomersController : ApiController
    {
        // GET api/customers
        public Models.LobResponse Get()
        {
            var context = new NorthwindEntities();
            var customers = from c in context.Customers
                         select new Models.Customer
                         {
                             CustomerID = c.CustomerID,
                             ContactName = c.ContactName,
                             CompanyName = c.CompanyName,
                             Country = c.Country,
                         };

            return (new Models.LobResponse {
                Username = System.Security.Claims.ClaimsPrincipal.Current?.Identity?.Name,
                RequestDateTime = DateTime.Now,
                Customers = customers.ToList(),
            });
        }

        // GET api/customers/ALFKI
        public Models.LobResponse Get(string customerId)
        {
            var context = new NorthwindEntities();
            var customer = context.Customers.FirstOrDefault(c => c.CustomerID == customerId);

            return (new Models.LobResponse
            {
                Username = System.Security.Claims.ClaimsPrincipal.Current?.Identity?.Name,
                RequestDateTime = DateTime.Now,
                Customers = (customer != null ? new List<Models.Customer>(new Models.Customer[] {
                new Models.Customer {
                    CustomerID = customer.CustomerID,
                    ContactName = customer.ContactName,
                    CompanyName = customer.CompanyName,
                    Country = customer.Country,
                } }) : null),
            });
        }

        // GET api/customers/search/Morgenstern Gesundkost
        [HttpGet]
        [Route("api/customers/search/{searchValue}")]
        public Models.LobResponse Search(string searchValue)
        {
            var context = new NorthwindEntities();
            var customers = from c in context.Customers
                            where c.CustomerID == searchValue || 
                                c.CompanyName.Contains(searchValue)
                            select new Models.Customer
                            {
                                CustomerID = c.CustomerID,
                                ContactName = c.ContactName,
                                CompanyName = c.CompanyName,
                                Country = c.Country,
                            };

            return (new Models.LobResponse
            {
                Username = System.Security.Claims.ClaimsPrincipal.Current?.Identity?.Name,
                RequestDateTime = DateTime.Now,
                Customers = customers.ToList(),
            });
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SharePointPnP.LobScenario.Models;

namespace SharePointPnP.LobScenario.Controllers
{
	[Authorize]
	[ApiController]
	[Route("[controller]")]
	public class CustomersController : ControllerBase
	{
		private readonly ILogger<CustomersController> _logger;

		public CustomersController(ILogger<CustomersController> logger)
		{
			_logger = logger;
		}

		// GET /customers
		[HttpGet]
		public LobResponse Get()
		{
			return (new LobResponse
			{
				Username = HttpContext.User.Identities.FirstOrDefault()?.Name,
				RequestDateTime = DateTime.Now,
				Customers = Customers,
			});
		}

		// GET /customers/{customerId}
		[HttpGet]
		[Route("{customerId}")]
		public LobResponse Get(string customerId)
		{
			return (new LobResponse
			{
				Username = HttpContext.User.Identities.FirstOrDefault()?.Name,
				RequestDateTime = DateTime.Now,
				Customers = Customers.Where(c => c.CustomerID.ToLowerInvariant() == customerId.ToLowerInvariant())
			});
		}

		// GET /customers/search/Morgenstern Gesundkost
		[HttpGet]
		[Route("search/{searchValue}")]
		public Models.LobResponse Search(string searchValue)
		{
			return (new LobResponse
			{
				Username = HttpContext.User.Identities.FirstOrDefault()?.Name,
				RequestDateTime = DateTime.Now,
				Customers = Customers.Where(c => c.CustomerID.ToLowerInvariant() == searchValue.ToLowerInvariant() ||
																				 c.CompanyName.Contains(searchValue, StringComparison.InvariantCultureIgnoreCase))
														 .ToList()
			});
		}

		private readonly List<Customer> Customers = new List<Customer> {
			new Customer{ CustomerID = "ALFKI", CompanyName = "Alfreds Futterkiste",ContactName = "Maria Anders",Country = "Germany"            },
			new Customer{ CustomerID = "ANATR", CompanyName = "Ana Trujillo Emparedados y helados", ContactName = "Ana Trujillo", Country = "Mexico" },
			new Customer{ CustomerID = "ANTON", CompanyName = "Antonio Moreno Taquería", ContactName = "Antonio Moreno", Country = "Mexico" },
			new Customer{ CustomerID = "AROUT", CompanyName = "Around the Horn", ContactName = "Thomas Hardy", Country = "UK" },
			new Customer{ CustomerID = "BERGS", CompanyName = "Berglunds snabbköp", ContactName = "Christina Berglund", Country = "Sweden" },
		};
	}
}
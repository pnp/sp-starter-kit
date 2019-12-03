using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SharePointPnP.LobScenario.Models
{
	public class LobResponse
	{
		public String Username { get; set; }

		public DateTime RequestDateTime { get; set; }

		public IEnumerable<Customer> Customers { get; set; }
	}
}

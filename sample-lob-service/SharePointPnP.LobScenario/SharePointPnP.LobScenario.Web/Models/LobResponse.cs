using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SharePointPnP.LobScenario.Web.Models
{
    public class LobResponse
    {
        public String Username { get; set; }

        public DateTime RequestDateTime { get; set; }

        public IEnumerable<Models.Customer> Customers { get; set; }
    }
}
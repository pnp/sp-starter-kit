using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;

namespace SharePointPnP.LobScenario
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			var azureadoptions = new AzureADOptions();
			Configuration.Bind("AzureAd", azureadoptions);
	 
			IdentityModelEventSource.ShowPII = true;

			services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)
					.AddAzureADBearer(options => Configuration.Bind("AzureAd", options));

			services.Configure<JwtBearerOptions>(AzureADDefaults.JwtBearerAuthenticationScheme, options =>
			{
				// This is a Microsoft identity platform web API.
				options.Authority += "/v2.0";

				// The web API accepts as audiences both the Client ID (options.Audience) and api://{ClientID}.
				options.TokenValidationParameters.ValidAudiences = new[]
				{
					options.Audience,
					$"api://{options.Audience}"
				};
				options.TokenValidationParameters.ValidateAudience = true;

				options.TokenValidationParameters.ValidIssuer = $"https://sts.windows.net/{azureadoptions.TenantId}/"; // for "signInAudience": "AzureADMyOrg" or "AzureADMultipleOrgs"
				options.TokenValidationParameters.ValidateIssuer = true;
			});

			services.AddControllers();

			services.AddCors(options =>
			{
				options.AddPolicy("AllowSubdomain",
				builder =>
				{
					builder.SetIsOriginAllowedToAllowWildcardSubdomains()
								.WithOrigins("https://*.sharepoint.com")
								.AllowAnyHeader()
								.AllowAnyMethod();
				});
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseCors("AllowSubdomain");

			app.UseAuthentication()
				 .UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using CacheManager.Core;
using VirtoCommerce.Platform.Core.Web.Security;

namespace VirtoCommerce.PageBuilderModule.Controllers.Api
{
    [RoutePrefix("api/pagebuilder/content")]
    public class PageBuilderController : ApiController
    {
        private readonly ICacheManager<object> _cacheManager;

        public PageBuilderController(ICacheManager<object> cacheManager)
        {
            _cacheManager = cacheManager;
        }

        [HttpPost]
        [Route("reset")]
        [CheckPermission(Permission = "content:update")]
        [ResponseType(typeof(void))]
        public IHttpActionResult RefreshPageInCache()
        {
            _cacheManager.Clear();
            return Ok();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using CacheManager.Core;
using VirtoCommerce.Platform.Core.Web.Security;

namespace VirtoCommerce.PageBuilderModule.Controllers.Api
{
    [RoutePrefix("api/content/{contentType}/{storeId}")]
    public class PageBuilderController : ApiController
    {
        private readonly ICacheManager<object> _cacheManager;

        public PageBuilderController(ICacheManager<object> cacheManager)
        {
            _cacheManager = cacheManager;
        }

        [HttpPost]
        [Route("")]
        [CheckPermission(Permission = "content:update")]
        public IHttpActionResult RefreshPageInCache(string contentType, string storeId, string url)
        {
            //this._cacheManager.
            return Ok();
        }
    }
}

chrome.webNavigation.onBeforeNavigate.addListener(details => {
  console.log(details);
  const blockedDomains = [
    { domain: "www.jianshu.com", param: "url" },
    { domain: "links.jianshu.com", param: "to" },
    { domain: "link.zhihu.com", param: "target" },
    { domain: "link.juejin.cn", param: "target" },
    { domain: "link.csdn.net", param: "target" },
    { domain: "hd.nowcoder.com", param: "target" },
    { domain: "www.yuque.com", param: "url" }
  ];

  const targetUrl = new URL(details.url);

  for (const { domain, param } of blockedDomains) {
    if (targetUrl.hostname === domain && targetUrl.searchParams.has(param)) {
      const redirectUrl = decodeURIComponent(targetUrl.searchParams.get(param));

      if (redirectUrl) {
        chrome.tabs.update(details.tabId, { url: redirectUrl });
        break; // 如果匹配到一个被阻止的域名，就不再继续检查其他域名
      }
    }
  }
});

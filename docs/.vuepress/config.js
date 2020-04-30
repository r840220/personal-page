const dirTree = require('directory-tree');
const path = require('path');
const util = require('util');

function dirSidebar(rootPath, subPath = '') {
  const _root = dirTree(path.join(rootPath, subPath), {
    extensions: /\.md$/,
    exclude: /\.vuepress/,
    normalizePath: true
  });
  let sidebar = [];
  if(typeof _root === 'object' && _root) {
    const rootChildren = _root.children;
    let _path = '';

    rootChildren.forEach(child => {
      if (child.name.toLowerCase() === 'readme.md') {
        return
      }
      let entry = '/'+path.join(subPath, child.name)
      sidebar.push(entry)
    })
  }
  return sidebar;
};

function getNavList(dirlist) {
  return dirlist.filter((item) => {
    return item.isNav;
  }).map((item) => {
    return {text: item.title, link: '/' + item.path + '/'};
  });
}

function getSidebar(dirlist) {
  let sidebar = {};
  dirlist.forEach((item) => {
    let key = '/' + item.path + '/';

    if (! (key in sidebar)) {
      sidebar[key] = [];
    }

    sidebar[key].push({
      title: item.title,
      children: dirSidebar(path.resolve('docs'), item.path)
    });
  });

  return sidebar;
}

const dirlist = [
  {title: '個人檔案', path: 'ma', isNav: true},
  {title: 'laravel', path: 'laravel', isNav: false},
  {title: 'vue', path: 'vue', isNav: false},
  {title: 'git', path: 'git', isNav: true},
  {title: '爬蟲爬起來', path: 'crawler', isNav: false},
];

module.exports = {
	title: '馬榮學習紀錄',
  displayAllHeaders: true,
	themeConfig: {
		nav: getNavList(dirlist),
		sidebar: getSidebar(dirlist),
    sidebarDepth: 2
	}
}

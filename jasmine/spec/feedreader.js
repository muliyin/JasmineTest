/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function () {
	/* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
	 * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
	*/
	describe('RSS Feeds', function () {
		/* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
		 * 不是空的。
		*/
		it('are defined', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/*
		 * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
		 */
		it('should has real url', function () {
			let checkUrl = true;
			const regularExpressionUrl = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/; // 检查 URL 格式是否正确的正规表达式

			for (let item of allFeeds) {
				/*如果url未定义或为空*/
				if (item.url === undefined || item.url == false) {
					checkUrl = false;
				}

				expect(item.url).toMatch(regularExpressionUrl); // 检查格式
			}

			expect(checkUrl).toBe(true);
		});


		/*
		 * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
		 */
		it('should has real name', function () {
			let checkName = true;
			for (let item of allFeeds) {
				if (item.name === undefined || item.name == false) {
					checkName = false;
				}
			}
			expect(checkName).toBe(true);
		});
	});


	/* 写一个叫做 "The menu" 的测试用例 */
	describe('The menu', function () {

		/*
         * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
         * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
         */
		it('default menu is hidden', function () {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});


		/*
		 * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
		 * 测试应该包含两个 expectation ： 党点击图标的时候菜单是否显示，
		 * 再次点击的时候是否隐藏。
		 */
		it('menu should change status', function () {
			const menuIcon = $('.menu-icon-link'); //菜单icon
			const body = $('body');

			/*第一次点击*/
			menuIcon.click();
			expect(body.hasClass('menu-hidden')).toBe(false)

			/*第二次点击*/
			menuIcon.click();
			expect(body.hasClass('menu-hidden')).toBe(true)
		});

	})


	/* "Initial Entries" 的测试用例 */

	describe('Initial Entries', function () {
		/* 测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         *
         * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
         * 和异步的 done() 函数。
         */
		const container = document.querySelector('.feed');
		beforeEach((done) => {
			jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
			loadFeed(0, done);
		});

		it('loadFeed is OK', function (done) {
			expect(container.hasChildNodes()).toBe(true);
			done();
		});

	})


	/* 写一个叫做 "New Feed Selection" 的测试用例 */
	describe('New Feed Selection', function () {
		/* 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
			* 记住，loadFeed() 函数是异步的。
			*/
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
		let beforeData, afterData;

		beforeEach((done) => {
			/*加载第一个菜单项*/
			const loadFirst = async function () {
				return new Promise(((resolve) => {
					loadFeed(0, () => {
						beforeData = document.querySelector('.feed').textContent.replace(/\s*/g, '').toString();
						resolve(1)
					});
				}))
			};

			/*加载第三个菜单项*/
			const loadSecond = async function () {
				return new Promise(((resolve) => {
					loadFeed(2, () => {
						afterData = document.querySelector('.feed').textContent.replace(/\s*/g, '').toString();
						resolve(2);
					});
				}))
			};

			async function testLoad(cb) {
				await loadFirst().then((result) => console.log(result));
				await loadSecond().then((result) => console.log(result));
				cb();
			}

			testLoad(done);
		});

		it('menu should change', function (done) {
			expect(beforeData).not.toBe(afterData);
			done();
		});
	})


}());

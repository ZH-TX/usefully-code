/**
 * 1. 使用call, apply 修改, 返回结果,然后做一些其他操作;
 * 2. 注意call/apply的主体
 * 3. 参考: loadsh_utils
 * 4. 对设计模式的思考??
 */
//eg1
const _map = Array.prototype.map;
Array.prototype.map = function (...args) {
  const result = _map.call(this, ...args);
  // XXX 可以做些额外操作
  return result;
};
//eg2
const _timeout = global.setTimeout; //window
global.setTimeout = function (
  func,
  time,
  ...rest
) {
  //XXX 这里使用global/window 与this的差异是什么呢
  return _timeout.call(
    global,
    func,
    time,
    ...rest
  );
};

const _rand = Math.random;

/**
 * localStorage.getItem has 5% chance return empty string
 * @zh localStorage.getItem 有5%几率返回空字符串
 */
if (global.localStorage) {
  const _getItem = global.localStorage.getItem;
  global.localStorage.getItem = function (
    ...args
  ) {
    let result = _getItem.call(
      global.localStorage,
      ...args
    );
    if (_rand() < 0.05) {
      result = null;
    }
    return result;
  };
}

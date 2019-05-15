const getMaxHeight = (queryItems) => 
  Math.max(...[...queryItems].map(item => item.offsetHeight));

export default () => {
  const itemsDescr = document.querySelectorAll('.applications__item__descr')
  const itemsAlso = document.querySelectorAll('.applications__item__also');
  [...itemsDescr].forEach(item => item.style.height = getMaxHeight(itemsDescr) + 'px');
  [...itemsAlso].forEach(item => item.style.height = getMaxHeight(itemsAlso) + 'px')
}
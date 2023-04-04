const filterBtn = document.getElementById('filter-btn');
const filterOptions = document.getElementById('filter-options');
const applyFilterBtn = document.getElementById('apply-filter-btn');

filterBtn.addEventListener('click', function() {
  filterOptions.style.display = filterOptions.style.display === 'none' ? 'block' : 'none';
});

// applyFilterBtn.addEventListener('click', function() {
//   const sortOption = document.querySelector('input[name="sort-by"]:checked').value;
//   // Apply sorting based on selected option
//   // ...
//   filterOptions.style.display = 'none';
// });

document.addEventListener('click', function(event) {
  const isClickInsideFilter = filterBtn.contains(event.target) || filterOptions.contains(event.target);
  if (!isClickInsideFilter) {
    filterOptions.style.display = 'none';
  }
});

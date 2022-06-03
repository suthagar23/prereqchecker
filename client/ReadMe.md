# Prerequest Checker - Client

## Development Guidelines.

### How Search works?

The search in the Table works for only selected columns (ie: fullName). When some one enters search keys words to the search text box,
1. Search text box triggers an `onChange` event, and it triggers `searchData` method which is responsible for searching.
2. Inside the `searchData` method, it go through each records in the table, and find out which rows has matching search keyword for the field(ie: fullname), and filter those for the display. It used `cloneDeep` to aviod core data mutation issues.
```
 const collectionData = cloneDeep(
      data
        .filter(item => item.full_name.toLowerCase().indexOf(query) > -1)
        .slice(0, countPerPage)
    );
```
3. It uses `throttle` wrapper to avoid multiple requests to the `searchData` function. 

### How Pagination works?

The pagination of the table is achived via `rc-pagination` NPM module for MVP workflows. It provides some wrapper method to pageChanges, pageNumberClicks and etc.
```
  <Pagination
    pageSize={countPerPage} // Row count per page view
    onChange={updatePage}   // On clicking pagination number, which method to trigger?
    current={currentPage}   // Current Page number
    total={data.length}     // total number of rows
    />
```

When someone clicking on the number of page from the Pagination bar, it calls the `updatePage` method with the page-number, and it uses that page-number to filter only relavent part of data for the active view of the page.
```
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(data.slice(from, to)));
```
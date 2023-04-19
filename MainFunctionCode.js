$(function() {

  // Set the name of the CSV file to be generated
  const csvFileName = 'team-membership-export.csv'

  // Set the delimiter to be used in the CSV file
  const csvDelimiter = ','

  // Set the header row for the CSV file
  const csvHeader = 'Display Name' + csvDelimiter + 'Title' + csvDelimiter + 'Location' + csvDelimiter + 'Role' + csvDelimiter + 'UPN' + '\r\n'

  // Initialize the CSV content with the header row
  let csvContent = csvHeader

  // Determine the number of visible members in the roster
  const rosterLength = $('.td-member-display-name').length

  // Check if we're an owner of the team
  let roleSelector = '.td-member-role' // Consider we're not an owner by default
  if ($('.td-member-editable-role').length > 0) {
    roleSelector = '.td-member-editable-role' // Override if we're an owner
  }

  // Loop through each member in the roster and extract their details
  for (let index = 0; index < rosterLength; index++) {
    // Extract the display name, title, location and role
    const displayName = $('.td-member-display-name').eq(index).text()
    const title = $('.td-member-title').eq(index).text()
    const location = $('.td-member-location').eq(index).text()
    const role = $(roleSelector).eq(index).text()
    const upn = $('.td-member-photo img').eq(index).attr('upn')

    // Append the member's details to the CSV content string
    const csvRow = displayName + csvDelimiter + title + csvDelimiter + location + csvDelimiter + role + csvDelimiter + upn + '\r\n'
    csvContent += csvRow
  }

  // Debug the export to console
  //console.info(rosterLength + ' members exported:')
  //console.info(csvContent)

  // Create a dynamic "a" tag
  var element = document.createElement('a')

  // Set href link with content
  element.setAttribute(
    'href',
    'data:application/json;charset=utf-8,' + encodeURIComponent(csvContent)
  )

  // Set downloaded file name
  element.setAttribute('download', csvFileName)

  // Hide the elemement and add it to the page
  element.style.display = 'none'
  document.body.appendChild(element)

  // Launch download
  element.click()

  // Remove element
  document.body.removeChild(element)
})

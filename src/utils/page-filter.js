export const nodesPerPage = 5;

export default (data, pageNumber) => (
  data.slice(
    pageNumber * nodesPerPage - nodesPerPage,
    pageNumber * nodesPerPage
  )
)

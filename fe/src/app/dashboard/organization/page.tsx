import { OrgCreateFormComponent } from "./(components)/org-create-form.component"
import { OrgUserDataTable } from "./(components)/org-user-data-table.component"

/**
 * Manage organization page.
 * Create, update, and delete organizations.
 * Add users to organizations.
 * @returns
 */
const OrgPage = () => {
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      {/* FORM */}
      <div className="flex flex-col gap-y-4">
        <OrgCreateFormComponent />
        <OrgUserDataTable />
      </div>
    </div>
  )
}

export default OrgPage

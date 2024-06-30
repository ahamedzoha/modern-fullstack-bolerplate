import { OrgCreateFormComponent } from "@/components/dashboard/organization/org-create-form.component"
import { OrgUserDataTable } from "@/components/dashboard/organization/org-user-data-table.component"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Users, PlusCircle } from "lucide-react"

const OrgPage = () => {
  return (
    <div className="container  px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Organizations</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Create Organization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OrgCreateFormComponent />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2">
          <Tabs defaultValue="organizations" className="w-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Organization Management</CardTitle>
                <TabsList>
                  <TabsTrigger
                    value="organizations"
                    className="flex items-center gap-2"
                  >
                    <Building className="w-4 h-4" />
                    Organizations
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    className="flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Users
                  </TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="organizations">
                <OrgUserDataTable />
              </TabsContent>
              <TabsContent value="users">
                {/* Add a component for managing users across organizations */}
                <p>
                  User management across organizations will be displayed here.
                </p>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

export default OrgPage

import BreadcrumbNavigation from "./breadcrumb-navigation"
import MobileMenu from "./mobile-menu"
import SearchInput from "./search-input"
import UserMenu from "./user-menu"

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <MobileMenu />
      <BreadcrumbNavigation />
      <SearchInput />
      <UserMenu />
    </header>
  )
}

export default Header

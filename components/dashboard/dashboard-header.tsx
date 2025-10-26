"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, LogOut } from "lucide-react"

interface DashboardHeaderProps {
  title: string
  mobileTitle?: string
  onBack: () => void
  onLogout: () => void
}

export function DashboardHeader({
  title,
  mobileTitle,
  onBack,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground shrink-0"
            >
              <ArrowLeft className="h-4 w-4 md:mr-2" />
              <span className="hidden sm:inline">Volver al Dashboard</span>
            </Button>
            <div className="hidden sm:block h-6 w-px bg-border" />
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <img
                src="/images/udesa-png.svg"
                alt="Universidad de San Andrés"
                className="h-6 md:h-8 w-auto shrink-0"
              />
              <h1 className="text-sm md:text-xl font-semibold text-foreground truncate">
                <span className="hidden md:inline">{title}</span>
                <span className="md:hidden">{mobileTitle || title}</span>
              </h1>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            size="sm"
            className="text-muted-foreground hover:text-foreground shrink-0 ml-2"
          >
            <LogOut className="h-4 w-4 md:mr-2" />
            <span className="hidden sm:inline">Cerrar sesión</span>
          </Button>
        </div>
      </div>
    </div>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, Lock, User } from "lucide-react"

export default function LoginPage() {
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // デモ用の認証ロジック
    if (userId === "demo" && password === "demo123") {
      // ログイン成功時はダッシュボードに遷移
      router.push("/dashboard")
    } else {
      alert("ユーザIDまたはパスワードが正しくありません")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-primary rounded-full p-3">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">ローン審査システム</h1>
          <p className="text-muted-foreground">オペレータログイン</p>
        </div>

        {/* ログインフォーム */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">ログイン</CardTitle>
            <CardDescription className="text-center">認証情報を入力してください</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId">ユーザID</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="userId"
                    type="text"
                    placeholder="ユーザIDを入力"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="パスワードを入力"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "ログイン中..." : "ログイン"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* デモ用認証情報 */}
        <Alert>
          <AlertDescription>
            <strong>デモ用認証情報:</strong>
            <br />
            ユーザID: demo
            <br />
            パスワード: demo123
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}

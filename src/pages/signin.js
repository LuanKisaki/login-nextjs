import Input from "@/components/inputs/input";
import styles from "../styles/Login.module.css"
import LoginCard from "@/components/loginCard/loginCard";
import Button from "@/components/buttons/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";


export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const router = useRouter()

  const handleFormEdit = (event, name) => {
    setFormData({
      ...formData,
      [name]: event.target.value
    })
  }

  const handleForm = async (event) => {
    try {
      event.preventDefault()
      const response = await fetch(`api/user/signin`, {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      const json = await response.json()
      if (response.status !== 200) throw new Error(json) 

      setCookie('authorization', json)
      router.push('/')
    } catch (err) {
      setError(err.message)
      
    }
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Acesse sua conta" >
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.form} onSubmit={handleForm}>
        <Input
          onChange={(e) => {handleFormEdit(e, 'email')}}
          placeholder="e-mail..."
          value={formData.email} 
          type="email" 
          required 
        />
        <Input 
          onChange={(e) => {handleFormEdit(e, 'password')}}
          value={formData.password}
          placeholder="senha..."
          type="password"
          required
        />
        <Button >Entrar</Button>
        </form>
        <label>
          Ainda não possui <Link href="/signup" className={styles.link} target="blank">conta</Link>
        ?</label>
      </LoginCard>
    </div>
  )
}
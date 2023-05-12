import { useState } from "react";
import Input from "@/components/inputs/input";
import styles from "../styles/Login.module.css"
import LoginCard from "@/components/loginCard/loginCard";
import Button from "@/components/buttons/button";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
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
      const response = await fetch(`api/user/signup`, {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      const json = await response.json()
      if (response.status !== 201) throw new Error(json) 

      setCookie('authorization', json)
      router.push('/signin')
    } catch (err) {
      setError(err.message)
      
    }
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Cadastre-se" >
        <form className={styles.form} onSubmit={handleForm}>
          <Input
            onChange={(e) => {handleFormEdit(e, 'name')}}
            placeholder="seu nome..."
            value={formData.name}
            type="text"
            required
          />
          <Input
            onChange={(e) => {handleFormEdit(e, 'email')}}
            placeholder="e-mail..."
            value={formData.email} 
            type="email" 
            required 
          />
            {error && <p className={styles.error}>{error}</p>}
          <Input
            onChange={(e) => {handleFormEdit(e, 'password')}}
            value={formData.password}
            placeholder="senha..."
            type="password"
            required
          />
          <Button >Cadastrar</Button>
          <label>
            ou acesse a sua conta clicando <Link href="/signin" className={styles.link}>aqui</Link>
          </label>
          </form>
      </LoginCard>
    </div>
  )
}
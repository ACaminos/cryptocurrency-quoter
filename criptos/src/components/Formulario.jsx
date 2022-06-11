import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import { monedas } from '../data/monedas'
import useSelectMonedas from '../hooks/useSelectMonedas'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = () => {
  const [criptos, setCriptos] = useState([])

    const [ state, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas)

    useEffect(() => {
      const consultarAPI = async () => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
        const respuesta = await fetch (url)
        const resultado = await respuesta.json()

        //Se realiza un map para generar un array con los resultados de Data dentro del array de la api que nos devuelve
        const arrayCriptos = resultado.Data.map(cripto => {

          //Para que no queden strings separados, se genera un objeto con id y nombre para que lo vaya agrupando y ordenando / iterando
          const objeto = {
            id : cripto.CoinInfo.Name,
            nombre : cripto.CoinInfo.FullName
          }
          return objeto
        })
        setCriptos(arrayCriptos)
      }
      consultarAPI()
    }, [])

  return (
    <form>
        <SelectMonedas />

        {state}

        <InputSubmit type="submit" value="Cotizar" />
    </form>
  )
}

export default Formulario
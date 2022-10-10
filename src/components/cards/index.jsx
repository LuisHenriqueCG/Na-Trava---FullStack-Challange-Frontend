import axios from 'axios'
import { useFormik} from 'formik'
import * as Yup  from 'yup'
import { useLocalStorage} from 'react-use'

const validationSchema = Yup.object().shape({
    homeTeamScore: Yup.string().required(),
    awayTeamScore: Yup.string().required()
  });

export const Card = ({disabled, gameId, homeTeam, awayTeam, homeTeamScore, awayTeamScore}) => {
    const [auth] = useLocalStorage('auth')

    const formik = useFormik({
        onsubmit: (values) => {
            axios({
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/hunches',
                headers: {
                    authorization: `Bearer ${auth.accessToken}`,
                },
                data: {
                    ...values,
                    gameId
                }
            })
        },
        initialValues: {
            homeTeamScore,
            awayTeamScore
        },
        validationSchema
    })

    return (
    <div className='rounded-xl border border-gray-300 p-4 text-center space-y-4'>
                        <span className='text-sm md: text-base text-gray-700 font-bold'>
                            {gameTime}
                        </span>

                        <form className='flex space-x-4 justify-center items-center'>
                            <span className='uppercase'>{homeTeam}</span>
                            <img src={`/imgs/Bandeiras/${homeTeam}.png`}/>

                            <input 
                                className='bg-red-300/[0.2]  w-[55px] h-[55px] text-red-700 text-xl text-center'
                                max={10} 
                                type="number"
                                name='homeTeamScore'
                                value={formik.values.homeTeamScore}
                                onChange={formik.handleChange}
                                onBlur={formik.handleSubmit}
                                disabled={disabled}    
                            /> 
                                
                            <span className='mx-4 text-red-500 font-bold'>X</span>
                            
                            <input 
                                className='bg-red-300/[0.2] w-[55px] h-[55px] text-red-700 text-xl text-center'
                                max={10} 
                                type="number" 
                                name='awayTeamScore'
                                value={formik.values.awayTeamScore}
                                onChange={formik.handleChange}
                                onBlur={formik.handleSubmit}
                                disabled={disabled}
                            />

                            <img src={`/imgs/Bandeiras/${awayTeam}.png`}/>
                            <span className='uppercase'>{awayTeam}</span>
                            
                        </form>
        </div> 
    )
}
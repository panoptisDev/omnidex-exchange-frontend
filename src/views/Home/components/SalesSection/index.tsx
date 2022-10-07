import React from 'react'
import { Router, Redirect, Route, Switch, Link } from 'react-router-dom'
import { Heading, Flex, Text, Button } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import CompositeImage, { CompositeImageProps } from '../CompositeImage'
import PurpleWordHeading from '../PurpleWordHeading'
import ConnectWalletButton from '../../../../components/ConnectWalletButton'

interface SalesSectionButton {
  to: string
  text: string
  external: boolean
}

export interface SalesSectionProps {
  headingText: string
  bodyText: string
  reverse: boolean
  primaryButton: SalesSectionButton
  secondaryButton?: SalesSectionButton
  headerimage: CompositeImageProps
  imagebtn1: CompositeImageProps
  imagebtn2: CompositeImageProps
  imagebtn3: CompositeImageProps
  imagebtn4: CompositeImageProps
  imagebtn5: CompositeImageProps
  imagebtn6: CompositeImageProps
}

const SalesSection: React.FC<SalesSectionProps> = (props) => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const { toastError, toastSuccess } = useToast()

  const { headingText, bodyText, reverse, primaryButton, secondaryButton, headerimage, imagebtn1, imagebtn2, imagebtn3, imagebtn4, imagebtn5, imagebtn6 } = props

  const headingTranslatedText = t(headingText)
  const bodyTranslatedText = t(bodyText)
  const isIncludeTelosEVM = bodyTranslatedText === 'Blazing Fast Trades on TelosEVM'
  const isGetTlosButton = secondaryButton?.text === 'Get Charm'
  let secondaryButtonTo = secondaryButton?.to

  if (isGetTlosButton && account) {
    secondaryButtonTo += account
  }

  const handleSendTlos = () => {
    fetch(secondaryButtonTo)
      .then((response) => {
        if (response.status.toString().startsWith('4')) {
          toastError('Something went wrong. Please, try again.')
        } else {
          toastSuccess('Sent successfully!')
        }
      })
      .catch(() => {
        toastError('Something went wrong. Please, try again.')
      })
  }

  return (
    <Flex flexDirection="column" justifyContent="center">
      <Flex>
        <PurpleWordHeading text={headingTranslatedText} />            
      </Flex>
      <Flex flexDirection="column" justifyContent="start">
        <Flex flexDirection="row" justifyContent='space-around'>    
          <Flex maxWidth="200px" height="50%">      
            <Link to= '/swap'>
              <CompositeImage {...imagebtn1} />
            </Link>            
          </Flex>          
          <Flex maxWidth="200px" height="50%">
            <Link to= '/liquidity'>
              <CompositeImage {...imagebtn2} />
            </Link>
          </Flex>
          <Flex maxWidth="200px" height="50%">
            <Link to= '/farms'>
              <CompositeImage {...imagebtn3} />
            </Link>
          </Flex>
        </Flex>
        <Flex flexDirection="row" justifyContent='space-around' mt="24px">          
          <Flex maxWidth="200px" height="50%">
            <Link to= '/pools'>
              <CompositeImage {...imagebtn4} />
            </Link>
          </Flex>
          <Flex maxWidth="200px" maxHeight="50%">
            <Link to= '/'>
              <CompositeImage {...imagebtn5} />
            </Link>
          </Flex>
          <Flex maxWidth="200px" height="50%">
            <Link to= '/'>
              <CompositeImage {...imagebtn6} />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SalesSection

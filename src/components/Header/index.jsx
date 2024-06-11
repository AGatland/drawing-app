import { Group, Container, useMantineColorScheme } from '@mantine/core';
import classes from './styles.module.css';
import ColorSchemeButton from './colorSchemeButton';
import assetLogoDark from '../../assets/logoDark.svg'
import assetLogoLight from '../../assets/logoLight.svg'
import { Link } from 'react-router-dom';

export default function Header() {
    const { colorScheme } = useMantineColorScheme();

  return (
    <div className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <img src={colorScheme == "dark" ? assetLogoDark : assetLogoLight} alt="Logo" className={classes.logo} />
          <Group gap={5} visibleFrom="sm">
            <Link to={"/"} className={classes.link}>Desktop</Link>
            <Link to={"/draw"} className={classes.link}>Draw</Link>
          </Group>
          <Group>
            <ColorSchemeButton />
          </Group>
        </div>
      </Container>
    </div>
  );
}
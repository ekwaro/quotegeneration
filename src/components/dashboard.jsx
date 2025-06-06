import { AppShell, Burger, Button, Group, Text, Center, Divider } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { IconHome } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";


const DashBoard = () => {
    const [opened, { toggle }] = useDisclosure();
    const navigate = useNavigate()
    return (
        
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group justify='space-evenly' mt='sm'>
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Text fs="normal" variant="gradient" size="lg">
                        Quote Generator
                    </Text>
                    <Button variant="outline" rightSection={<IconHome />} onClick={() => navigate('/')}>Home</Button>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <Center mt='xl'>
                    <Text variant='gradient'>Actions</Text>
                    
                </Center>
                <Divider m='xl'/>
                <Group mx='sm' variant="outline"  mt='md'>
                    <Button fullWidth variant='transparent' onClick={()=>navigate('/dashboard/generate')}>Generate Quote</Button>
                    <Button fullWidth variant='transparent'>Favorites</Button>
                </Group>
                    
                    
                

            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

export default DashBoard;

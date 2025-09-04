const { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

// ==== PLACEHOLDERS ====
const TOKEN = 'MTQwNTY1MjQ2MjQyOTU0MDQ5Mg.GE7tkm.YNNnk6Pro8DSFdDmTD9RnvAuNySEphG5BSzi5I';
const API_CHANNELS = ['1405648844385026149', '1404600539706294372']; // Channels to welcome users
const PROMO_CHANNEL_ID = '1404597768496091267'; // Channel for periodic messages

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    startPromoMessages();
});

// === EVENT: New member joins ===
client.on('guildMemberAdd', async member => {
    try {
        // === API CHANNEL WELCOME ===
        const apiEmbed = new EmbedBuilder()
            .setTitle(`🎉 Welcome @${member.user.username}!`)
            .setDescription(
`Hello and welcome to the **Lumix AI API section**!

Here, developers, AI enthusiasts, and innovators explore, build, and integrate AI services.

✅ Please feel free to:
- Explore our API endpoints
- Test API requests
- Ask questions in the community

We’re excited to see what you create!`)
            .setColor('#22c55e')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setImage('https://i.imghippo.com/files/udL6658dkU.jpg')
            .setFooter({ text: 'Lumix AI API', iconURL: 'https://i.imghippo.com/files/MvC8729taE.png' });

        API_CHANNELS.forEach(channelId => {
            const channel = member.guild.channels.cache.get(channelId);
            if (channel) channel.send({ embeds: [apiEmbed] }).catch(console.error);
        });

        // === DM TO USER (Fully Enhanced Invite Tracker–style) ===
        const dmEmbed = new EmbedBuilder()
            .setColor('#8b5cf6')
            .setAuthor({ name: '✨ Lumix AI', iconURL: 'https://i.imghippo.com/files/MvC8729taE.png' })
            .setTitle(`👋 Welcome to Lumix AI, ${member.user.username}!`)
            .setDescription(
`Thanks for joining **Lumix AI**! 🚀  
We’re excited to help you explore, learn, and build amazing things with AI.`)
            .addFields(
                {
                    name: '🚀 Getting Started',
                    value: `> Explore our **API endpoints**, try requests, and start integrating Lumix AI into your projects right away.`
                },
                {
                    name: '📚 Documentation & Guides',
                    value: `> Access tutorials, quickstart examples, and detailed references in our [Documentation](https://your-lumix-docs-link.com).`
                },
                {
                    name: '🌟 Unlock Premium Features',
                    value: `> Get access to advanced tools, higher rate limits, priority support, and early feature access.`
                },
                {
                    name: '❓ Need Help?',
                    value: `> Join our [Support Server](https://discord.gg/your-support-invite) if you have questions or need assistance.`
                },
                {
                    name: '💡 Tips & Tricks',
                    value: `> Share your projects, join discussions, and collaborate with other developers!  
> Stay updated with announcements and new features in the server.`
                }
            )
            .setThumbnail('https://i.imghippo.com/files/MvC8729taE.png')
            .setImage('https://i.imghippo.com/files/udL6658dkU.jpg')
            .setFooter({ text: 'Lumix AI • Innovate with Intelligence', iconURL: 'https://i.imghippo.com/files/MvC8729taE.png' });

        const dmButton1 = new ButtonBuilder()
            .setLabel('📖 Open Docs')
            .setURL('https://your-lumix-docs-link.com')
            .setStyle(ButtonStyle.Link);

        const dmButton2 = new ButtonBuilder()
            .setLabel('🌐 Visit Website')
            .setURL('https://your-lumix-docs-link.com')
            .setStyle(ButtonStyle.Link);

        const dmButton3 = new ButtonBuilder()
            .setLabel('⭐ Upgrade Premium')
            .setURL('https://your-lumix-premium-link.com')
            .setStyle(ButtonStyle.Link);

        const dmRow = new ActionRowBuilder().addComponents(dmButton1, dmButton2, dmButton3);

        await member.send({ embeds: [dmEmbed], components: [dmRow] });

    } catch (error) {
        console.error(`Failed to welcome ${member.user.tag}:`, error);
    }
});

// === FUNCTION: Periodic Promo Messages ===
function startPromoMessages() {
    async function sendPromo() {
        const channel = await client.channels.fetch(PROMO_CHANNEL_ID).catch(() => null);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setTitle('🎁 Limited Time Free API!')
            .setDescription('Head over to the API channel now and claim your **free Lumix AI API** for a limited time!')
            .setColor('#f59e0b')
            .setThumbnail('https://i.imghippo.com/files/MvC8729taE.png');

        const button = new ButtonBuilder()
            .setLabel('Go to API Channel')
            .setURL('https://discord.com/channels/1266768812192301107/1405648844385026149')
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder().addComponents(button);

        channel.send({ embeds: [embed], components: [row] }).catch(console.error);

        // Schedule next promo in 20–30 minutes randomly
        const delay = Math.floor(Math.random() * (30 - 20 + 1) + 20) * 60 * 1000;
        setTimeout(sendPromo, delay);
    }

    sendPromo();
}

client.login(TOKEN);


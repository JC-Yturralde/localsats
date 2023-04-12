import { Layout } from '@/components/layout'
import { GroupedMessage } from '@/types/types'
import { getNameFromId, getPostId } from '@/utils/utils'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useText } from '@/hooks/useText'

export function Messages({
	messages,
	setOpenChatPaywallId,
	setLocationProps,
	posts
}: {
	messages: GroupedMessage[]
	setOpenChatPaywallId: (id: string) => void
	setLocationProps: (val: any) => void
	posts: any
}) {
	const t = useText()
	const session = useSession()
	const user = session?.data?.user?.userId
	return (
		<div>
			<div className='w-full my-8'>
				<div className='sm:flex sm:items-center'>
					<div className='sm:flex-auto'>
						<h2>{t.yourMessages}</h2>
					</div>
				</div>

				<div className='overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg'>
					<table className='table table-normal  w-full mt-0 mb-0'>
						<thead>
							<tr>
								<th className='!z-0'>{t.postId}</th>
								<th>{t.otherParty}</th>
								<th>{t.latestMessage}</th>
								<th></th>

								<th>
									<span className='sr-only'>open</span>
								</th>
							</tr>
						</thead>
						<tbody id='messages'>
							{messages &&
								messages.map((message, personIdx) => {
									const post = posts?.find((p) => p.id === message.postId)
									return (
										<tr key={message.chatPaywallId}>
											<td className=''>
												<button
													onClick={() =>
														setLocationProps({
															center: {
																lat: post?.lat,
																lng: post?.lng
															},
															zoom: 29
														})
													}
													className='btn btn-primary btn-link '>
													{getPostId(message.postId)}
													<span className='sr-only'></span>
												</button>
											</td>
											<td>
												{message.messages[0].fromUserId === user
													? getNameFromId(message.messages[0].toUserId)
													: getNameFromId(message.messages[0].fromUserId)}
											</td>
											<td>
												<div className='truncate w-24 md:w-48 relative'>
													{message.messages[message.messages.length - 1].body}
												</div>
											</td>
											<td>
												{!message.hasUnreadMessages ? (
													<></>
												) : (
													<span className=' inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800'>
														<svg
															className='-ml-0.5 mr-1.5 h-2 w-2 text-green-400'
															fill='currentColor'
															viewBox='0 0 8 8'>
															<circle cx={4} cy={4} r={3} />
														</svg>
														{t.new}
													</span>
												)}
											</td>

											<td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
												<button
													onClick={() =>
														setOpenChatPaywallId(message.chatPaywallId)
													}
													className='btn btn-primary btn-link  '>
													{t.open}
													<span className='sr-only'></span>
												</button>
											</td>
										</tr>
									)
								})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

Messages.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

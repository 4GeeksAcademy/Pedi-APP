"""empty message

Revision ID: 7201953e6779
Revises: 9fe0bf5aac8b
Create Date: 2023-07-22 15:01:20.866394

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7201953e6779'
down_revision = '9fe0bf5aac8b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('historial_pedidos', schema=None) as batch_op:
        batch_op.alter_column('precioActual',
               existing_type=sa.REAL(),
               type_=sa.Float(precision=2),
               existing_nullable=True)

    with op.batch_alter_table('productos', schema=None) as batch_op:
        batch_op.alter_column('precio',
               existing_type=sa.REAL(),
               type_=sa.Float(precision=2),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('productos', schema=None) as batch_op:
        batch_op.alter_column('precio',
               existing_type=sa.Float(precision=2),
               type_=sa.REAL(),
               existing_nullable=False)

    with op.batch_alter_table('historial_pedidos', schema=None) as batch_op:
        batch_op.alter_column('precioActual',
               existing_type=sa.Float(precision=2),
               type_=sa.REAL(),
               existing_nullable=True)

    # ### end Alembic commands ###